 # GitHub View Counter

A serverless GitHub Profile View Counter built with Appwrite.

## Setup

1.  This project is initialized with Appwrite.
2.  The database `giews_db` and collection `views` store the counts.
3.  The function `get_views` handles the logic and SVG generation.

## Usage

Add the following to your GitHub Profile `README.md`:

### Terminal Style (Default)

```markdown
![Views](https://694bb3e20002f1f0c410.fra.appwrite.run/YOUR_USERNAME_OR_ID/terminal)
```

### Glitch Style (Coming Soon)

```markdown
![Views](https://694bb3e20002f1f0c410.fra.appwrite.run/YOUR_USERNAME_OR_ID/glitch)
```

### Centered

To center the badge, use HTML:

```html
<p align="center">
  <img src="https://694bb3e20002f1f0c410.fra.appwrite.run/YOUR_USERNAME_OR_ID/terminal" alt="Views"/>
</p>
```

Replace `YOUR_USERNAME_OR_ID` with a unique identifier (e.g., your GitHub username).