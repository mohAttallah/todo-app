import { useContext } from 'react';
import { When } from 'react-if';

import { LoginContext } from '../../Context/Auth/context';

function Auth(props) {
    const context = useContext(LoginContext);
    const { can, loggedIn } = context;
    const isLoggedIn = loggedIn;
    const canDo = props.capability ? can(props.capability) : true;
    const okToRender = isLoggedIn && canDo;    
    return (
        <When condition={okToRender}>
            {props.children}
        </When>
    );


}

export default Auth;

