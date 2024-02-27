import { useState } from "react";
import "./index.css";

const initialFriends = [
  {
    id: 118836,
    name: "Simona",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Șaka",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Aurel",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];
export default function App() {
  const [friends, setFriends] = useState(initialFriends);
  const [showForm, setShowForm] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList friends={friends} />
        {showForm && <FormAddFriend onAddFriend={handleAddFriend} />}
        <Button onClick={handleShowForm}>
          {showForm ? "Inchide" : "Adaugă prieten"}
        </Button>
      </div>
      <div>
        {selectedFriend && <FormSplitBill/>}
      </div>
    </div>
  );

  function handleShowForm() {
    setShowForm((show) => !show);
  }

  function handleAddFriend(friend) {
    setFriends((friends) => [...friends, friend]);
    setShowForm(false);
  }

  function handleSelection(friend) {
    setSelectedFriend(friend);
  }
}

function FriendsList({ friends }) {
  return (
    <>
      <ul>
        {friends.map((item) => (
          <Friend friend={item} />
        ))}
      </ul>
    </>
  );
}

function Friend({ friend }) {
  return (
    <li>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>
      {friend.balance < 0 && (
        <p className="red">
          Datorezi {Math.abs(friend.balance)} euro lui {friend.name}
        </p>
      )}
      {friend.balance > 0 && (
        <p className="green">
          {friend.name} îți datorează {Math.abs(friend.balance)} euro
        </p>
      )}
      {friend.balance === 0 && <p>Tu și {friend.name} nu aveți datorii</p>}

      <Button>Selectare</Button>
    </li>
  );
}

function FormAddFriend({ onAddFriend }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");

  function handleSubmit(event) {
    event.preventDefault();

    if (!name || !image) return;

    const id = crypto.randomUUID();

    const newFriend = {
      name,
      image: `${image}?=${id}`,
      balance: 0,
      id,
    };

    onAddFriend(newFriend);

    setName("");
    setImage("https://i.pravatar.cc/48");
  }

  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label>👫 Nume prieten</label>
      <input type="text" value={name} onChange={handleNameChage} />

      <label>🖼 Link imagine</label>
      <input type="text" value={image} onChange={handleImageChange} />

      <Button>Adaugă</Button>
    </form>
  );

  function handleNameChage(event) {
    setName(event.target.value);
  }
  function handleImageChange(event) {
    setImage(event.target.value);
  }
}

function FormSplitBill() {
  return (
    <form className="form-split-bill">
      <h2>Imparte nota cu X:</h2>

      <label>💰Valoare nota</label>
      <input type="number" />

      <label>📫Cheltuielile tale</label>
      <input type="number" />

      <label>😂Cheltuielile lui X</label>
      <input type="number" disabled />

      <label>😢Cine plateste?</label>
      <select>
        <option>Eu</option>
        <option>Tu</option>
        <option>Si-o umbrela</option>
      </select>

      <Button>Imparte</Button>
    </form>
  );
}

function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}
