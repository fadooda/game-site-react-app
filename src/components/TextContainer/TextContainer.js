import React from 'react';

import onlineIcon from '../../icons/onlineIcon.png';

import './TextContainer.css';

const TextContainer = ({ users }) => (
  <div className="textContainer">
    <div>

    </div>
    {
      users
        ? (
          <div>
                  <h2 > Welcome to Free Games Online <span role="img" aria-label="emoji">❤️</span></h2>
            <div className="activeContainer">
              <h2>
              People currently playing <span role="img" aria-label="emoji">💬</span>
                {users.map(({name}) => (
                  <div key={name} className="activeItem">
                    {name}
                    <img alt="Online Icon" src={onlineIcon}/>
                  </div>
                ))}
              </h2>
            </div>
          </div>
        )
        : null
    }
  </div>
);

export default TextContainer;