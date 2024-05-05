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

import Lab1 from "@/views/Module1";
import Module1 from "@/views/Module1";
import Lab2 from "@/views/Lab2";
import {ThemeProvider} from "@/components/theme-provider";
import MenuNav from "@/components/ux/menu-nav";
import Lab3 from "@/views/Lab3";
import Lab4 from "@/views/Lab4";
import Lab6 from "@/views/Lab6";
import Lab7 from "@/views/Lab7";
import Lab8 from "@/views/lab8";
import Lab9 from "@/views/lab9";
import Lab10 from "@/views/lab10";
import Lab11 from "@/views/lab11";

setupIonicReact();


const App: React.FC = () => (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <IonApp>
            <IonReactRouter>
                <MenuNav items={[
                    {title: "Lab 1", route: "/lab1"},
                    {title: "Lab 2", route: "/lab2"},
                    {title: "Lab 3", route: "/lab3"},
                    {title: "Lab 4", route: "/lab4"},
                    {title: "Lab 6", route: "/lab6"},
                    {title: "Module 1", route: "/module1"},
                    {title: "Lab 7", route: "/lab7"},
                    {title: "Lab 8", route: "/lab8"},
                    {title: "Lab 9", route: "/lab9"},
                    {title: "Lab 10", route: "/lab10"},
                    {title: "Lab 11", route: "/lab11"},
                ]}/>
                <Route exact path="/lab1">
                    <Lab1/>
                </Route>
                <Route exact path="/lab2">
                    <Lab2/>
                </Route>
                <Route exact path="/lab3">
                    <Lab3/>
                </Route>
                <Route exact path="/lab4">
                    <Lab4/>
                </Route>
                <Route exact path="/lab6">
                    <Lab6/>
                </Route>
                <Route exact path="/module1">
                    <Module1/>
                </Route>
                <Route exact path="/lab7">
                    <Lab7/>
                </Route>
                <Route exact path="/lab8">
                    <Lab8/>
                </Route>
                <Route exact path="/lab9">
                    <Lab9/>
                </Route>
                <Route exact path="/lab10">
                    <Lab10/>
                </Route>
                <Route exact path="/lab11">
                    <Lab11/>
                </Route>
                <Route exact path="/">
                    <Redirect to="/lab11"/>
                </Route>
            </IonReactRouter>
        </IonApp>
    </ThemeProvider>
);

export default App;
