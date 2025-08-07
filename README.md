# Dipisha Kalura Book Promotion Website

Welcome to the **Dipisha Kalura Book Promotion Website** project! This project is designed to celebrate and promote Dipisha Kalura's journey as an author, showcase her books, and build a community of readers and fans.

## Purpose

The primary goal of this project is to serve as a centralized platform to:

- **Promote Dipisha Kalura as an author**: Highlight her achievements, vision, and passion for writing.
- **Showcase her upcoming books**: Provide readers with detailed information about her latest and upcoming works.
- **Engage with readers**: Share updates, blogs, and news while fostering a community of supporters.
- **Streamline connections**: Offer contact information and links to social media channels to ensure seamless interaction.

This website acts as the one-stop destination to connect with Dipisha Kalura and stay updated on her writing journey.

## Features

- **Author Biography**: Learn about Dipisha Kalura’s background, inspiration, and writing journey.
- **Upcoming Book Details**: Get all the essential information about her latest works, including release dates, synopses, and exclusive previews.
- **Blog Section**: Stay updated with the latest news, writing tips, and personal updates from the author.
- **Contact & Social Media Links**: Connect directly with Dipisha through email or her social media channels.

## Getting Started

To set up and run the project locally, follow these steps:

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/dipisha-book-website.git
cd dipisha-book-website
```

### 2. Install Dependencies

Make sure you have [Node.js](https://nodejs.org/) and npm (or yarn) installed on your system. Then, install the required dependencies:

```bash
npm install
# or
yarn install
```

### 3. Decap CMS Setup (Optional)

This project integrates with Decap CMS for content management. To use the CMS locally or in production with GitHub authentication, you need to set up a GitHub OAuth Application.

1.  **Create a GitHub OAuth App**: Go to your GitHub settings (or organization settings) -> Developer settings -> OAuth Apps -> New OAuth App.
    *   **Homepage URL**: `http://localhost:3000` (for local development) or your deployed website URL.
    *   **Authorization callback URL**: `http://localhost:3000/admin` (for local development) or `YOUR_DEPLOYED_URL/admin`.
2.  **Environment Variables**: Once created, you will get a `Client ID` and `Client Secret`. These need to be set as environment variables in your deployment environment (e.g., Vercel, Netlify, Cloudflare Pages).
    *   `NEXT_PUBLIC_GITHUB_CLIENT_ID=YOUR_GITHUB_CLIENT_ID`
    *   `GITHUB_CLIENT_SECRET=YOUR_GITHUB_CLIENT_SECRET` (This is a sensitive variable and should NOT be exposed to the client-side).

    For local development, you can create a `.env.local` file in the project root:
    ```
    NEXT_PUBLIC_GITHUB_CLIENT_ID=your_local_client_id
    GITHUB_CLIENT_SECRET=your_local_client_secret
    ```

3.  **Accessing the CMS**: Once configured, you can access the CMS at `/admin` (e.g., `http://localhost:3000/admin`).

### 4. Run the Development Server

Start the development server to view the website locally:

```bash
npm run dev
# or
yarn dev
```

Open your browser and navigate to [http://localhost:3000](http://localhost:3000) to see the website in action.

### 4. Build for Production

To create an optimized build for deployment, run:

```bash
npm run build
# or
yarn build
```

### 5. Start the Production Server

Once the project is built, you can serve it in production mode:

```bash
npm start
# or
yarn start
```

## Contributing

We welcome contributions to improve and enhance the website. Here’s how you can contribute:

1. Fork the repository.
2. Create a new branch with your feature or fix.
3. Commit your changes and push them to your forked repository.
4. Submit a pull request with a clear explanation of your changes.

Your contributions are greatly appreciated!

## Deployment guideline
1. `npm run build`: build out man
2. then `wrangler pages deploy out/`
## Contact

For inquiries, feedback, or collaboration opportunities, please feel free to reach out:

- **Email**: [deepeshkalurs@gmail.com](mailto:deepeshkalurs@gmail.com)

Thank you for supporting Dipisha Kalura’s writing journey!
