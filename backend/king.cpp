#include <iostream>
#include <string>
#include "opencv2/core/matx.hpp"
#include "opencv2/flann/result_set.h"
#include "opencv2/opencv.hpp"

using namespace cv;
using namespace std;

size_t sum(const Mat& image) {
    size_t result = 0;
    for(int i = 0; i < image.rows; i++)
    {
        for(int j = 0; j < image.cols; j++)
        {
          Vec3b bgrPixel = image.at<Vec3b>(i, j);
          result += bgrPixel.val[0] + bgrPixel.val[1] + bgrPixel.val[2];  
          // do something with BGR values...
        }
    }
    return result;
}
uint8_t mymod(ssize_t x,int d) {
    x = (x < 0) ? -x : x;
    return x%d;
}

Mat encrypt(Mat& image,int X,int Y,double x0,double y0,double a,double b,double c,double d,int n0,size_t& sum1,bool usesum = true) {  
  size_t rows = image.rows;
  size_t cols = image.cols;
  size_t total = rows*cols;
  if(usesum)
    sum1 = sum(image);
  
  // update parameters of tinkerbell system
  if(usesum)
    x0 += (sum1 >> 30);
  y0 += (X >> 20);
  a += (Y >> 30);
  
  Mat D(rows,cols,CV_16SC3,Scalar(-1,-1,-1));
  Mat image_flat = image.clone();
  image_flat.reshape(1);
  image_flat.convertTo(image_flat,CV_16SC3);

  //generate and dump first n0 values of the chaotic system
  for(int i = 0; i<n0; i++) {
      double org = x0;
      x0 = (x0*x0) - (y0*y0) + a*x0 + b*y0;
      y0 = 2*org*y0 + c*org + d*y0;
  }
  uint8_t* move = new uint8_t[total];
  uint8_t* mask = new uint8_t[total*3];
  size_t mask_idx = 0;
  
  for(size_t i = 0; i<total; i++) {
      double org = x0;
      x0 = (x0*x0) - (y0*y0) + a*x0 + b*y0;
      y0 = 2*org*y0 + c*org + d*y0;
      move[i] = mymod((ssize_t)floor((x0*1e14)) , 4) + 1;
      uint8_t tmp = mymod((ssize_t)floor(y0*1e14), 256);
      mask[mask_idx++] = tmp;
      mask[mask_idx++] = tmp;
      mask[mask_idx++] = tmp;
  }

  size_t i = X;
  size_t j = Y;
  size_t m = rows;
  size_t n = cols;
  Vec3s bgrPixel;
  Vec3s aux(-1,-1,-1);
  // Scramble the image
  for(size_t k = 0; k < total; k++) {
    uint8_t val = move[k];
    switch(val) {
      case 1: //left
        j = (j == 0) ? n-1 : j-1;
        break;
      case 2: // up
        i = (i == 0) ? m-1 : i-1;
        break;
      case 3: // right
        j = (j == n - 1) ? 0 : j+1;
        break;
      case 4: // down
        i = (i == m-1) ? 0 : i+1;
    }
    bgrPixel = D.at<Vec3s>(i,j);
    if(bgrPixel.val[0] == -1) {
        
        D.at<Vec3s>(i,j) = image_flat.at<Vec3s>(k);
        image_flat.at<Vec3s>(k).val[0] = -1;
        image_flat.at<Vec3s>(k).val[1] = -1;
        image_flat.at<Vec3s>(k).val[2] = -1;
    }
  }

  //Put remaining pixels
  ssize_t k = -1;
  for(size_t i = 0; i < rows; i++) {
      for(size_t j = 0; j < cols; j++) {
          bgrPixel = D.at<Vec3s>(i,j);
          if(bgrPixel.val[0] == -1) {
              while(image_flat.at<Vec3s>(k+1).val[0] == -1)
                  k += 1;
              bgrPixel = image_flat.at<Vec3s>(k+1);
              D.at<Vec3s>(i,j).val[0] = bgrPixel.val[0];
              D.at<Vec3s>(i,j).val[1] = bgrPixel.val[1];
              D.at<Vec3s>(i,j).val[2] = bgrPixel.val[2];
              k += 1;
          }
      }
  }

  D.convertTo(D,CV_8UC3);
  //imwrite("scrambled.png",D);
  
  Mat mask_mat(rows,cols,CV_8UC3,mask);
  bitwise_xor(D,mask_mat,D);
  delete[] move;
  delete[] mask;
  return D;
}


Mat decrypt(Mat& image,int X,int Y,double x0,double y0, double a,double b,double c,double d,int n0,size_t sum,bool usesum=true) {

  // update parameters of tinkerbell system
  if(usesum)
      x0 += (sum >> 30);
  y0 += (X >> 20);
  a += (Y >> 30);
  
  size_t rows = image.rows;
  size_t cols = image.cols;
  size_t total = rows*cols;
  
  
  Mat decrypted(rows,cols,CV_16SC3,Scalar(-1,-1,-1));
  
  //generate and dump first n0 values of the chaotic system
  for(int i = 0; i<n0; i++) {
      double org = x0;
      x0 = (x0*x0) - (y0*y0) + a*x0 + b*y0;
      y0 = 2*org*y0 + c*org + d*y0;
  }
  uint8_t* move = new uint8_t[total];
  uint8_t* mask = new uint8_t[total*3];
  size_t mask_idx = 0;
  
  for(size_t i = 0; i<total; i++) {
      double org = x0;
      x0 = (x0*x0) - (y0*y0) + a*x0 + b*y0;
      y0 = 2*org*y0 + c*org + d*y0;
      move[i] = mymod((ssize_t)floor((x0*1e14)) , 4) + 1;
      uint8_t tmp = mymod((ssize_t)floor(y0*1e14), 256);
      mask[mask_idx++] = tmp;
      mask[mask_idx++] = tmp;
      mask[mask_idx++] = tmp;
  }

  Mat mask_mat(rows,cols,CV_8UC3,mask);
  bitwise_xor(image,mask_mat,image);
  image.convertTo(image, CV_16SC3); 
  
  size_t i = X;
  size_t j = Y;
  size_t m = rows;
  size_t n = cols;
  Vec3s bgrPixel;
  Vec3s aux(-1,-1,-1);
  
  // un-scramble the image
  for(size_t k = 0; k < total; k++) {
    uint8_t val = move[k];
    switch(val) {
      case 1: //left
        j = (j == 0) ? n-1 : j-1;
        break;
      case 2: // up
        i = (i == 0) ? m-1 : i-1;
        break;
      case 3: // right
        j = (j == n - 1) ? 0 : j+1;
        break;
      case 4: // down
        i = (i == m-1) ? 0 : i+1;
    }
    bgrPixel = image.at<Vec3s>(i,j);
    if(bgrPixel.val[0] != -1) {
        decrypted.at<Vec3s>(k) = bgrPixel;
        image.at<Vec3s>(i,j) = aux;
    }
  }
  
  ssize_t k = -1;
  for(size_t i = 0; i < rows; i++) {
      for(size_t j = 0; j < cols; j++) {
          bgrPixel = decrypted.at<Vec3s>(i,j);
          if(bgrPixel.val[0] == -1) {
              while(image.at<Vec3s>(k+1).val[0] == -1)
                  k += 1;
              bgrPixel = image.at<Vec3s>(k+1);
              decrypted.at<Vec3s>(i,j).val[0] = bgrPixel.val[0];
              decrypted.at<Vec3s>(i,j).val[1] = bgrPixel.val[1];
              decrypted.at<Vec3s>(i,j).val[2] = bgrPixel.val[2];
              k += 1;
          }
      }
  }
  decrypted.convertTo(decrypted,CV_8UC3);
  delete[] move;
  delete[] mask;
  return decrypted;
}

int main(int argc,const char* argv[]) {
    if(argc != 9) {
        puts("usage: king <action> <infile> <outfile> <X> <Y> <n0> <sum>");
        return 1;
    }
    const char* id = argv[1];
    const char* infile = argv[3];
    const char* outfile = argv[4];
    const char* action = argv[2];
    int X = atoi(argv[5]);
    int Y = atoi(argv[6]);
    int n0 = atoi(argv[7]);
    size_t sum = atoll(argv[8]);
    double x0 = -0.8;
    double y0 = -0.5;
    double a = 0.9;
    double b = -0.6013;
    double c = 2;
    double d = 0.5;
    // std::cout << "CUDA support: " << cv::cuda::getCudaEnabledDeviceCount() << std::endl;
    //std::cout << cv::getBuildInformation() << std::endl;
    //return 0;

    if(strcmp(action,"eimg") == 0) {
        Mat pic = imread(infile);
        Mat encrypted = encrypt(pic,X,Y,x0,y0,a,b,c,d,n0,sum);
        imwrite(outfile,encrypted);
        cout << sum << endl;
        std::string command = "python add-key.py "+(std::string)id+" "+std::to_string(X) +" "+std::to_string(Y) +" "+std::to_string(n0) +" "+std::to_string(sum);
        system(command.c_str());  
    }
    else if(strcmp(action,"dimg") == 0) {
        Mat pic = imread(infile);
        cout << sum << endl;
        Mat decrypted = decrypt(pic,X,Y,x0,y0,a,b,c,d,n0,sum);
        imwrite(outfile,decrypted);
    }
    else if(strcmp(action,"evideo") == 0) {
        VideoCapture cap(infile,cv::CAP_FFMPEG);
        if (!cap.isOpened()) {
            std::cout << "Cannot open the video file.\n";
            return 1;
        }
        cap.set(cv::CAP_PROP_HW_ACCELERATION, cv::VIDEO_ACCELERATION_ANY); 
        int fps = static_cast<int>(cap.get(cv::CAP_PROP_FPS));
        size_t totalFrames = static_cast<size_t>(cap.get(cv::CAP_PROP_FRAME_COUNT));
        std::cout << "FPS: " << fps << ", Total Frames: " << totalFrames << std::endl;
        cv::Size frameSize(static_cast<int>(cap.get(cv::CAP_PROP_FRAME_WIDTH)), static_cast<int>(cap.get(cv::CAP_PROP_FRAME_HEIGHT)));
        cv::VideoWriter writer(outfile, cv::CAP_FFMPEG,cv::VideoWriter::fourcc('H','F', 'Y', 'U'), fps, frameSize);
        cv::Mat frame;
        for (size_t frame_count = 0; frame_count < 500; frame_count++) {    
            if (!cap.read(frame)) {
                std::cout << "Failed to extract a frame.\n";
                return -1;
            }
            //Mat tmp = frame.clone();
            size_t sum1 = 0;
            Mat encrypted = encrypt(frame,X,Y,x0,y0,a,b,c,d,n0,sum,false);
            writer<<encrypted;
            //writer << frame;
        } 
        std::string command = "python add-key.py "+(std::string)id+" "+std::to_string(X) +" "+std::to_string(Y) +" "+std::to_string(n0) +" "+std::to_string(sum);
        system(command.c_str());  
    }
    else if(strcmp(action,"dvideo") == 0) {
        VideoCapture cap(infile,cv::CAP_FFMPEG);
        if (!cap.isOpened()) {
            std::cout << "Cannot open the video file.\n";
            return 1;
        }
        cap.set(cv::CAP_PROP_HW_ACCELERATION, cv::VIDEO_ACCELERATION_ANY); 
        int fps = static_cast<int>(cap.get(cv::CAP_PROP_FPS));
        size_t totalFrames = static_cast<size_t>(cap.get(cv::CAP_PROP_FRAME_COUNT));
        std::cout << "FPS: " << fps << ", Total Frames: " << totalFrames << std::endl;
        cv::Size frameSize(static_cast<int>(cap.get(cv::CAP_PROP_FRAME_WIDTH)), static_cast<int>(cap.get(cv::CAP_PROP_FRAME_HEIGHT)));
        cv::VideoWriter writer(outfile, cv::CAP_FFMPEG,cv::VideoWriter::fourcc('H','F', 'Y', 'U'), fps, frameSize);
        cv::Mat frame;
        for (size_t frame_count = 0; frame_count < cap.get(cv::CAP_PROP_FRAME_COUNT); frame_count++) {
            
//            cout << frame_count << endl;
            if (!cap.read(frame)) {
                std::cout << "Failed to extract a frame.\n";
                return -1;
            }
            size_t sum1 = 0;
            Mat encrypted = decrypt(frame,X,Y,x0,y0,a,b,c,d,n0,sum,false);
            writer<<encrypted;

        }
  }
  else {
    puts("unknown action");
    return 1;
  }

  return 0;  
}

