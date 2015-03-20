# Release Notes

## Usage

- Rename edit_host.json to host.json and enter all needed data. Make sure to remove all comments from the json file

- Adjust commands to execute on server

- Install node modules by typing:

```sh
    npm install
```

- To run the release task simply type

```sh
    npm run release
```

### Tasks order

1. Backup files on server 
2. Upload new release data
3. Extract archive