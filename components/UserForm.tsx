"use client"

import React, { useState, FormEvent } from 'react';

interface UserFormProps {
  onUserSubmit: (name: string, email: string, image: string) => void;
}

const UserForm: React.FC<UserFormProps> = ({ onUserSubmit }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onUserSubmit(name, email, image);
    setName('');
    setEmail('');
    setImage('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="image">Image URL:</label>
        <input
          type="text"
          id="image"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
      </div>
      <button type="submit">Add User</button>
    </form>
  );
};

export default UserForm;