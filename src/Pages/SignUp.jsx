import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { account } from '../Config/AppwriteConfig';
import { ID } from 'appwrite';

const SignUp = () => {
    const navigate = useNavigate()
    const [user, setUser] = useState({
        username: "", 
        email: "", 
        password: ""
    });

    useEffect(() => {
        const promise = account.deleteSession("current")
        console.log(promise);
    }, []);

    
    const handleSubmit = async (e) => {
        e.preventDefault()
        
        try {
            const result = await account.create(
                ID.unique(), // userId
                user.email, // email
                user.password, // password
                user.username // name (optional)
            );

            console.log(result);

            await account.createEmailPasswordSession(
                user.email,
                user.password
            )
            
            navigate('/home')

        } catch (error) {
            console.log(error);
        }

    }



    return (
        <div className=' flex flex-col gap-6'>
            <h1 className=' font-bold'>Sign Up</h1>
            <form
            className=' flex flex-col gap-3'
            onSubmit={handleSubmit}
            action="">
                <input 
                className=' p-2 placeholder:opacity-[0.4] rounded-md'
                // value={user.username}
                type="text"
                placeholder='Enter your name'
                onChange={(e) => setUser({...user, username: e.target.value})}
                required
                />
                <input 
                className=' p-2 placeholder:opacity-[0.4] rounded-md'
                // value={user.email}
                type="email" 
                placeholder='Enter your email id' 
                onChange={(e) => setUser({...user, email: e.target.value})}
                required
                />
                <input 
                className=' p-2 placeholder:opacity-[0.4] rounded-md'
                // value={user.password}
                type="password" 
                placeholder='Create a password' 
                onChange={(e) => setUser({...user, password: e.target.value})}
                required
                />
                <button type="submit"> Sign up</button>
            </form>
            <p>Already have an account?

            <Link
            to="/"
            className=' ml-1'
            >
            Login
            </Link>

            </p>
        </div>
    );
}

export default SignUp;
