import React, {useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "../utils/auth";

const Home = () => {
    const navigate = useNavigate();
    useEffect(() => {
        if (isAuthenticated()) {
          navigate('/dashboard');
        }
      }, [navigate]);

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
                    <h1 className="text-5xl font-bold mb-6">Less stress tracking your expenses</h1>
                    <p className="text-xl mb-6">
                        With Expense-Tracker, easily track balances, organize expenses, and check your monthly spends.
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
            <Section bgColor="bg-gray-800" text="Track balance" imageSrc={`${process.env.PUBLIC_URL}/track_balance.png`} />

            {/* Organize Expenses Section */}
            <Section bgColor="bg-teal-500" text="Organize expenses" imageSrc={`${process.env.PUBLIC_URL}/expenses.png`} />

            {/* Add Expenses Section */}
            <Section bgColor="bg-orange-500" text="Add expenses easily" imageSrc={`${process.env.PUBLIC_URL}/add_expense.png`}  />


            {/* Get More Section */}
            <Section bgColor="bg-purple-700" text="Check your monthly spends" imageSrc={`${process.env.PUBLIC_URL}/compare.png`} />

            {/* Footer */}
            <footer className="bg-gray-100 py-4 text-gray-800">
                <p className="text-center mb-4">© 2024 Expense-Tracker</p>
                
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
