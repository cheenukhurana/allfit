
const Cover = () => {

    return (
        <div className="flex justify-between">
            <div className="flex-1">
                <div className=" m-20 max-w-fit boder">
                    <p className="text-xl text-orange-500">All Pass</p>
                    <p className="mt-6 text-3xl font-bold">Unlimited Access to</p>
                    <ul className="mt-6 list-disc list-inside">
                        <li >All Gym Centers</li>
                        <li className="mt-4">At-Centere Group Classes</li>
                        <li className="mt-4">At-home Live Workouts</li>
                    </ul>
                </div>
            </div>

            <div className="flex-1">
                <img src="/coverPic.png" className="block mx-auto align-right w-[60%] text-right" alt="" />
            </div>
        </div>
    )
}

export default Cover