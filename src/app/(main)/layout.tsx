import Footer from '@/components/homepage/Footer';
import Navbar from '@/components/homepage/Navbar';
import React, { ReactNode } from 'react';

type LayoutProps = {
    children: ReactNode
}

const layout = ({ children }: LayoutProps) => {
    return (
        <div>
            <Navbar></Navbar>
            <main>
                {children}
            </main>
            <Footer></Footer>
        </div>
    );
};

export default layout;