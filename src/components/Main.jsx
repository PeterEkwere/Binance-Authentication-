import React from 'react';

export default function Main() {
    return (
        <div className='main'>    
            <div className='main-items'>    
                <img className="item-1" src="https://appleid.cdn-apple.com/appleauth/static/bin/cb2194917758/dist/assets/appleaccount_icon_color-60-light@3x.png" alt="logo"/>

                <h1 className="item-2 text-[#333]">Sign in with Apple ID</h1>
        
                <input 
                    type="text" 
                    id="account_name_text_field" 
                    autoComplete="off" 
                    autoCorrect="off" 
                    autoCapitalize="off" 
                    aria-required="true" 
                    required="required" 
                    spellCheck="false" 
                    className='item-3 text-[#333]' 
                    placeholder="Apple ID" 
                    aria-invalid="false" 
                    autoFocus=""
                />

                <div className="item-4 text-[#333]">
                    <input type="checkbox" id="topping" name="topping" value="Paneer" /> Keep me signed in
                </div>
                
                <a className='item-5'>Forgotten your Apple ID or password?</a>
                <a className='item-6'>Create Apple ID</a>
            </div>
        </div>
    );
}