import React, { useState }  from 'react'
import Settingslayout from './Settingslayout'

const Settings = () => {
  const [activeTab, setActiveTab] = useState("editInfo");

  return (
    <div><Settingslayout activeTab={activeTab} setActiveTab={setActiveTab}/></div>
  )
}

export default Settings