CREATE TABLE files (
    file_id SERIAL PRIMARY KEY,
    file_name VARCHAR(255) NOT NULL,
    file_type VARCHAR(50) NOT NULL,
    folder_id INTEGER REFERENCES folders(folder_id),
    created_by VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    file_size INTEGER, -- Size in bytes
    access_list TEXT[] -- List of emails (Array of strings)
);