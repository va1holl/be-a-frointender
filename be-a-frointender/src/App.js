import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedAlbumId, setSelectedAlbumId] = useState(null);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Ошибка при получении пользователей:', error);
      });
  }, []);

  const handleViewAlbums = (userId) => {
    setSelectedUserId(userId);
    axios.get(`https://jsonplaceholder.typicode.com/albums?userId=${userId}`)
      .then(response => {
        setAlbums(response.data);
        setPhotos([]);
      })
      .catch(error => {
        console.error('Ошибка при получении альбомов:', error);
      });
  };

  const handleViewAlbum = (albumId) => {
    setSelectedAlbumId(albumId);
    axios.get(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`)
      .then(response => {
        setPhotos(response.data);
      })
      .catch(error => {
        console.error('Ошибка при получении фотографий:', error);
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Список пользователей</h1>
        <div>
          {users.map(user => (
            <div key={user.id} className="user-card">
              <h2>{user.name}</h2>
              <button onClick={() => handleViewAlbums(user.id)}>Дивитись альбоми</button>
            </div>
          ))}
        </div>

        {albums.length > 0 && (
          <div>
            <h2>Альбоми користувача</h2>
            {albums.map(album => (
              <div key={album.id} className="album-card">
                <h3>{album.title}</h3>
                <button onClick={() => handleViewAlbum(album.id)}>Дивитись альбом</button>
              </div>
            ))}
          </div>
        )}

        {photos.length > 0 && (
          <div>
            <h2>Фотографії альбому</h2>
            <div className="photos">
              {photos.map(photo => (
                <div key={photo.id} className="photo-card">
                  <img src={photo.thumbnailUrl} alt={photo.title} />
                  <p>{photo.title}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;