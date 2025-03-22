import React from 'react';

const CommandList = () => {
    const commandList = [
        ['about', 'Display information about me'],
        ['projects', 'View my projects'],
        ['skills', 'View my technical skills'],
        ['contact', 'Display my contact information'],
        ['interests', 'View my personal interests'],
        ['education', 'View my educational background'],
        ['portfolio', 'View my professional portfolio'],
        ['matrix', 'Enter the Matrix'],
        ['quote', 'Display a random programming quote'],
        ['vim', 'Open the vim editor (if you dare)'],
        ['neofetch', 'Display system information'],
        ['clear', 'Clear the terminal'],
        ['help', 'Display this help message']
    ];

    return (
        <div className="command-list">
            <h3>Available Commands</h3>
            <ul>
                {commandList.map((command, index) => (
                    <li key={index}>{commandList.map((item) => (
                        <div>

                        </div>
                    ))}</li>
                ))}
            </ul>
        </div>
    );
};

export default CommandList; 