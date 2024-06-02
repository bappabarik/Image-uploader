import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { account } from '../Config/AppwriteConfig';

const Login = () => {
    const navigate = useNavigate()
    const [user, setUser] = useState({
        email: "", 
        password: ""
    });

    useEffect(() => {
        const promise = account.deleteSession("current")
        console.log(promise);
    }, []);
    
    const handleLogin = async (e) => {
        e.preventDefault()
        
        try {
            await account.createEmailPasswordSession(
                user.email, // email
                user.password, // password
            );
            
            navigate('/home')

        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className=' flex flex-col gap-6'>
            <h1 className=' font-bold'>Login</h1>
            <form
            className=' flex flex-col gap-3'
            onSubmit={handleLogin}
            action="">
                <input 
                className=' p-2 placeholder:opacity-[0.4] rounded-md'
                // value={user.email}
                type="email" 
                placeholder='Email id' 
                onChange={(e) => setUser({...user, email: e.target.value})}
                required
                />
                <input 
                className=' p-2 placeholder:opacity-[0.4] rounded-md'
                // value={user.password}
                type="password" 
                placeholder='password' 
                onChange={(e) => setUser({...user, password: e.target.value})}
                required
                />
                <button type="submit"> Login</button>
            </form>
            <p className=''>Don't have an account?
            <Link
            className=' ml-1'
            to="/signup"
            >
             Sign up
            </Link>
            </p>
        </div>
    );
}

export default Login;
