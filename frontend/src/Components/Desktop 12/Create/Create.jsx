import React, { useState } from "react";
import CreateLayout from "./CreateLayout";
import { toast } from "sonner";

const Create = ({ setIsCreate, setCreateFolder, setName, name, setAccess }) => {
  const [onlyCircle, setOnlyCircle] = useState(false);
  const [specificCircle, setSpecificCircle] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const handleName = (e) => {
    const inputName = e.target.value;
    setName(inputName);
  };

  const handleOnlyCircle = () => {
    setOnlyCircle(!onlyCircle);
    setSpecificCircle(false);
    setAccess("onlyYou");
  };
  const handleSpecificCircle = () => {
    setSpecificCircle(!specificCircle);
    setOnlyCircle(true);
    setAccess("specificPeople");
  };
  const handleCheck = () => {
    setIsChecked(!isChecked);
  };

  const handleCreateButton = () => {
    if (name.length === 0) {
      toast.error("Name should not be blanked.");
    } else if (name.length > 0) {
      toast.success("Folder has been created successfully!");
      setIsCreate(false);
      setCreateFolder(true);
      setName("");
    }
  };
  const handleCancelButton = () => {
    setIsCreate(false);
    setName("");
  };

  return (
    <div>
      <CreateLayout
        handleOnlyCircle={handleOnlyCircle}
        onlyCircle={onlyCircle}
        specificCircle={specificCircle}
        handleSpecificCircle={handleSpecificCircle}
        isChecked={isChecked}
        handleCheck={handleCheck}
        name={name}
        handleName={handleName}
        handleCreateButton={handleCreateButton}
        handleCancelButton={handleCancelButton}
      />
    </div>
  );
};

export default Create;
