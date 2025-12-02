import { Button } from "antd";

export default function Signup() {
    return (
        <>
            <div className="flex flex-1 flex-col justify-between items-center ">
                <Button
                    type="default"
                    size="large"
                    icon=""
                    className="my-8"
                >
                    Sign up with EntraID
                </Button>
                <div>
                    <p className="text-black text-xs">
                        Already have an account?
                        <a className="text-indigo-600">Login</a>
                    </p>
                </div>
            </div>
        </>
    );
}
