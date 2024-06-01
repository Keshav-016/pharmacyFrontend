import Logo from './Logo';

const AuthenticationTemplate = ({ SubHeading, children }) => {
    return (
        <>
            <div className=" bg-background-image min-h-screen bg-cover flex justify-center items-center bg-no-repeat ">
                <div className="flex flex-col gap-3 bg-white px-5 py-9 rounded-xl w-96 h-1/4">
                    <div className="flex flex-col gap-2">
                        <Logo />
                        <div className=" font-default-font-family md:text-[1.7rem] text-[1.3rem] ">
                            {SubHeading}
                        </div>
                    </div>
                    {children}
                </div>
            </div>
        </>
    );
};

export default AuthenticationTemplate;
