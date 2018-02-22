# simon-say

A (partial) implementation of the [Speech Synthesis Interface Protocol](https://devel.freebsoft.org/doc/speechd/ssip.html) for macOS.

The macOS `say` command is used for speech synthesis.

## Supported commands

| Command                                   |
| ----------------------------------------- |
| `LIST VOICES`                             |
| `SET (all \| self \| id) VOICE_TYPE type` |
| `GET VOICE_TYPE`                          |
| `SPEAK`                                   |

## Installation and usage

This requires node v8+.

You can install globally:

    npm install --global https://github.com/andrewn/simon-say/archive/master.tar.gz

Or you can install locally:

    npm install --save https://github.com/andrewn/simon-say/archive/master.tar.gz

## Usage

Start the server listening on the socket path `/tmp/speechd.sock` use the command:

    SOCKET_PATH=/tmp/speechd.sock simon-say

You can then use a client that speaks SSIP to connect to that socket and send commands.
