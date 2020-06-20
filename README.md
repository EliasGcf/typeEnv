# typeEnv

create a .d.ts file to your .env file

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
![npm](https://img.shields.io/npm/v/@eliasgcf/type-env)
 <img alt="GitHub" src="https://img.shields.io/github/license/EliasGcf/typeEnv">

<img src="https://res.cloudinary.com/eliasgcf/image/upload/v1592694763/typeEnv/typeenv_fqz3wd.gif" alt="Gif" />

<p align="center">
  <a href="#without-a-type-definition">Without a Type definition</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#with-a-type-definition">With a Type definition</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-getting-started">Getting started</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-how-to-contribute">How to contribute</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-license">License</a>
</p>

## Without a Type definition

<img src="https://res.cloudinary.com/eliasgcf/image/upload/v1592694748/typeEnv/Screenshot_at_Jun_20_20-09-35_xjehd8.png" alt="Without d.ts">

## With a Type definition

<img src="https://res.cloudinary.com/eliasgcf/image/upload/v1592694749/typeEnv/Screenshot_at_Jun_20_20-11-56_rlj6ov.png" alt="With d.ts">

## ⚙️ Getting Started

### Requirements

- [Node.js](https://nodejs.org/en/)
- [Yarn](https://classic.yarnpkg.com/) or [npm](https://www.npmjs.com/)

### Instalation

```bash
$ yarn global add @eliasgcf/type-env
# or
$ npm install -g @eliasgcf/type-env
```

## Usage

### Path

> create the env.d.ts inside another folder: --path/-p

```bash
typeEnv --path=src/my-types
```

---

### File

> change the default env file (.env): --file/-f

```bash
typeEnv --file .other.env
```

---

### Show

> just show the results and not create the d.ts file: --show/-s

```bash
typeEnv --show
```

## 🤔 How to contribute

**Make a fork of this repository**

```bash
# Fork using GitHub official command line
# If you don't have the GitHub CLI, use the web site to do that.

$ gh repo fork EliasGcf/typeEnv
```

**Follow the steps below**

```bash
# Clone your fork
$ git clone your-fork-url && cd typeEnv

# Create a branch with your feature
$ git checkout -b my-feature

# Make the commit with your changes
$ git commit -m 'feat: My new feature'

# Send the code to your remote branch
$ git push origin my-feature
```

After your pull request is merged, you can delete your branch

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Made with 💜 by Elias Gabriel 👋 [See my linkedin](https://www.linkedin.com/in/eliasgcf/)
