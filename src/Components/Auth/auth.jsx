import { useContext } from 'react';
import { When } from 'react-if';

import { LoginContext } from './context';

function Auth(props) {
    const context = useContext(LoginContext);
    const isLoggedIn = context.loggedIn;
    //check the capability
    const canDo = props.capability ? context.can(props.capability) : true;
    const okToRender = isLoggedIn && canDo;

    console.log("isLoggedIn:", isLoggedIn);
    console.log("capability:", props.capability);
    console.log("canDo:", canDo);
    console.log("okToRender:", okToRender);

    return (
        <When condition={okToRender}>
            {props.children}
        </When>
    );


}

export default Auth;
