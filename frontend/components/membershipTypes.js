import { membershipTypesData } from "../membershipTypesData"
import Link from 'next/link'

const MembershipTypes = () => {

    const handleMembershipBuy = () => {
        console.log("Want to buy")
    }

    return (
        <div className="flex">
            {membershipTypesData.map((membership, index) => (
                <div key={membership.duration} className="rounded-lg p-4 bg-gray-500 mx-5 cursor-pointer" onClick={handleMembershipBuy}>
                <Link href={`/memberships/${membership.duration}`}>
                    <div className="border-b border-b-gray-100 flex justify-between pb-2">
                        <div className="flex flex-col">
                            <p>{membership.duration}</p>
                            <p>MONTHS</p>
                        </div>
                        <div>{membership.price} Dai</div>
                    </div>
                    <div className="mt-2">Get {membership.extras}</div>
                    <button className="mt-2 px-2 py-1 bg-white text-orange-500 rounded mx-auto block">BUY NOW</button>
                    </Link>
                </div>
            ))}
        </div>
    )
}

export default MembershipTypes