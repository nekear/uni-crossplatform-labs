import {Redirect, Route} from 'react-router-dom';
import {IonApp, IonRouterOutlet, setupIonicReact} from '@ionic/react';
import {IonReactRouter} from '@ionic/react-router';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

import Home from "@/views/Home";
import {ThemeProvider} from "@/components/theme-provider";

setupIonicReact();


const App: React.FC = () => (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <IonApp>
            <IonReactRouter>
                <IonRouterOutlet>
                    <Route exact path="/home">
                        <Home/>
                    </Route>
                    <Route exact path="/">
                        <Redirect to="/home"/>
                    </Route>
                </IonRouterOutlet>
            </IonReactRouter>
        </IonApp>
    </ThemeProvider>
);

export default App;
