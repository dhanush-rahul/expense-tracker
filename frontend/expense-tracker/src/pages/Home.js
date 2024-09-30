import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();

    const loginClicked = async(e) => {
        e.preventDefault();
        navigate('/login');
    }

    const signUpClicked = async(e) => {
        e.preventDefault();
        navigate('/register');
    }

    return (
        <div className="text-center">
            {/* Header Section */}
            <header className="bg-gray-100 text-gray-800 py-24">
                <div className="max-w-2xl mx-auto px-4">
                    <h1 className="text-5xl font-bold mb-6">Less stress when sharing expenses on trips</h1>
                    <p className="text-xl mb-6">
                        With Splitwise, easily track balances, organize expenses, and pay friends back.
                    </p>
                    <div className="space-x-4">
                        <button onClick={loginClicked} className="px-6 py-3 text-lg bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
                            Log In
                        </button>
                        <button onClick={signUpClicked} className="px-6 py-3 text-lg bg-green-500 text-white rounded-lg hover:bg-green-600 transition">
                            Sign Up
                        </button>
                    </div>
                </div>
            </header>

            {/* Track Balance Section */}
            <Section bgColor="bg-gray-800" text="Track balance" imageSrc="" />

            {/* Organize Expenses Section */}
            <Section bgColor="bg-teal-500" text="Organize expenses" imageSrc="" />

            {/* Add Expenses Section */}
            <Section bgColor="bg-orange-500" text="Add expenses easily" imageSrc="" />

            {/* Pay Friends Back Section */}
            <Section bgColor="bg-gray-800" text="Pay friends back" imageSrc="" />

            {/* Get More Section */}
            <Section bgColor="bg-purple-700" text="Get even more with PRO" imageSrc="" />

            {/* Footer */}
            <footer className="bg-gray-100 py-4 text-gray-800">
                <p className="text-center mb-4">© 2024 Splitwise</p>
                <div className="text-center space-x-4">
                    <a href="#" className="hover:underline">About</a>
                    <a href="#" className="hover:underline">Help</a>
                    <a href="#" className="hover:underline">Terms</a>
                </div>
            </footer>
        </div>
    );
};

// Reusable Section Component
const Section = ({ bgColor, text, imageSrc }) => (
    <div className={`flex justify-center items-center py-12 ${bgColor}`}>
        <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">{text}</h2>
            {imageSrc && <img src={imageSrc} alt={text} className="mx-auto" />}
        </div>
    </div>
);

export default Home;
