'use client'
import { authClient } from '@/lib/auth-client';
import React from 'react';
import { FiLogOut } from 'react-icons/fi';

const Logout = () => {
    return (
        <div>
            <button
                onClick={async () => await authClient.signOut()}
                type="button"
                className="btn hidden h-12 min-h-0 rounded-xl border-none bg-[#412D15] px-6 font-semibold text-white hover:bg-[#1F150C] lg:inline-flex"
            >
                <FiLogOut className="text-lg" />
                Logout
            </button>
        </div>
    );
};

export default Logout;