import React from "react";
import { createRoot } from 'react-dom/client';
import App from "~/App";
import { AuthService } from "~/services/authService";
import { FirebaseDB } from "~/services/database";
import { QuotesAPI } from "./services/quotesApi";

const authService = new AuthService();
const firebaseDB = new FirebaseDB();
const quotesAPI = new QuotesAPI();

const container = document.getElementById('root');
if (!container) throw new Error('Failed to find the root element');
const root = createRoot(container);
root.render(
    <React.StrictMode>
        <App 
            authService={authService}
            firebaseDB={firebaseDB}
            quotesAPI={quotesAPI}
        />
    </React.StrictMode>
);