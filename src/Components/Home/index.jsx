import React from 'react';
import Header from '../Header';
import Todo from '../Todo';
import List from '../List';
import Footer from '../Footer';
function Home() {
    return (
        <div>
            <Header />
            <Todo />
            <List />
            <Footer />
        </div>
    );
}

export default Home;