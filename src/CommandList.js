import React from 'react';

const CommandList = () => {
    const commands = [
        'help',
        'clear',
        'exit',
        // Add more commands here
    ];

    return (
        <div className="command-list">
            <h3>Available Commands</h3>
            <ul>
                {commands.map((command, index) => (
                    <li key={index}>{command}</li>
                ))}
            </ul>
        </div>
    );
};

export default CommandList; 