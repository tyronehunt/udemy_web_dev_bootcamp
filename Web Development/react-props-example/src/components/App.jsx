import React from "react";
import Card from "./Card";
import contacts from "../contacts";


function createCard(contact) {
  return <Card 
    // id = {contact.id} //key is special required for map function to work. Use id if you need the value.
    key = {contact.id}
    name = {contact.name}
    img = {contact.imgURL}
    tel = {contact.phone}
    email = {contact.email}
  />
}

function App() {
  return (
    <div>
      <h1 className="heading">My Contacts</h1>

      {contacts.map(createCard)}

    </div>
  );
}

export default App;
