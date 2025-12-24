 # GitHub View Counter

A serverless GitHub Profile View Counter built with Appwrite.

## Usage

Add the following to your GitHub Profile `README.md`:

### Terminal Style (Default)

![Views](https://giews.fra.appwrite.run/xkaper001-giews/terminal)

```markdown
![Views](https://giews.fra.appwrite.run/YOUR_USERNAME_OR_ID/terminal)
```

### Glitch Style (Coming Soon)

![Views](https://giews.fra.appwrite.run/xkaper001-giews/glitch)

```markdown
![Views](https://giews.fra.appwrite.run/YOUR_USERNAME_OR_ID/glitch)
```

### Centered

To center the badge, use HTML:

<p align="center">
  <img src="https://giews.fra.appwrite.run/xkaper001-giews/terminal" alt="Views"/>
</p>

```html
<p align="center">
  <img src="https://giews.fra.appwrite.run/YOUR_USERNAME_OR_ID/terminal" alt="Views"/>
</p>
```

Replace `YOUR_USERNAME_OR_ID` with a unique identifier (e.g., your GitHub username).


## Setup

1.  This project is initialized with Appwrite.
2.  The database `giews_db` and collection `views` store the counts.
3.  The function `get_views` handles the logic and SVG generation.
