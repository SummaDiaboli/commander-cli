# commander-cli

## Install

Clone the repository:

```bash
$ git clone {repository_url}
```

Install dependencies:
```bash
$ cd commander-cli
$ npm install
```

Create API key from [Google AI Studio](https://aistudio.google.com/app/apikey) and add it to your `.env` file.

```bash
GEMINI_API_KEY={API_KEY}
```

You can also get the API key from any other AI provider and add it to your `.env` file.

##### NOTE: You also need to make changes in `src/components/commandQuery.tsx` to accomodate your AI provider.

Build the app:

```bash
$ npm run build
```

Add to your path and you're good to go!🚀

## CLI

```
$ commander-cli --help

  Usage
    $ commander-cli

  Examples
    $ commander-cli
```
