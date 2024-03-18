import React from "react";
import {Redirect, Route} from 'react-router-dom';
import {IonApp, setupIonicReact} from '@ionic/react';
import {IonReactRouter} from '@ionic/react-router';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

import Lab1 from "@/views/Lab1";
import Lab2 from "@/views/Lab2";
import {ThemeProvider} from "@/components/theme-provider";
import MenuNav from "@/components/ux/menu-nav";
import Lab3 from "@/views/Lab3";
import Lab4 from "@/views/Lab4";

setupIonicReact();


const App: React.FC = () => (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <IonApp>
            <IonReactRouter>
                <MenuNav items={[
                    {title: "Lab 1", route: "/lab1"},
                    {title: "Lab 2", route: "/lab2"},
                    {title: "Lab 3", route: "/lab3"},
                    {title: "Lab 4", route: "/lab4"},
                ]}/>
                <Route exact path="/lab1">
                    <Lab1 />
                </Route>
                <Route exact path="/lab2">
                    <Lab2 />
                </Route>
                <Route exact path="/lab3">
                    <Lab3 />
                </Route>
                <Route exact path="/lab4">
                    <Lab4 />
                </Route>
                <Route exact path="/">
                    <Redirect to="/lab1"/>
                </Route>
            </IonReactRouter>
        </IonApp>
    </ThemeProvider>
);

export default App;
