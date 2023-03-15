function Login() {
    return <div className="bg-gradient-to-r from-green-600 to-green-800 h-screen" initial={{width: 0}} animate={{width: "100%"}} exit={{x: window.innerWidth, transition: {duration: 0.5}}}>
        <div className="rounded-3xl h-[40rem] w-[32rem] mx-auto relative top-16 bg-white border-black">
            <h1 className="text-black text-center relative top-8 text-5xl">Login</h1>
            <hr className="border-1 border-black w-[75%] m-auto relative top-12"></hr>
        </div>
    </div>;
}

export default Login;