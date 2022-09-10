import React from "react";
import { createRoot } from 'react-dom/client';
import App from "~/App";
import { AuthService } from "~/services/authService";
import { FirebaseDB } from "~/services/database";

const authService = new AuthService();
const firebaseDB = new FirebaseDB();

const container = document.getElementById('root');
if (!container) throw new Error('Failed to find the root element');
const root = createRoot(container);
root.render(
    <React.StrictMode>
        <App 
            authService={authService}
            firebaseDB={firebaseDB}
        />
    </React.StrictMode>
);