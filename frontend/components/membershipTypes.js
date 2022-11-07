import { membershipTypesData } from "../membershipTypesData"
import Link from 'next/link'

const MembershipTypes = () => {

    const handleMembershipBuy = () => {
        console.log("Want to buy")
    }

    return (
        <div>

            <p className="text-center mt-12 text-xl"> Choose Your All Pass</p>
            <div className="mt-8 flex justify-around">
                {membershipTypesData.map((membership, index) => (
                    <div key={membership.duration} className="rounded-lg bg-slate-400 hover:bg-slate-600 mx-6 cursor-pointer" onClick={handleMembershipBuy}>
                        <Link href={`/memberships/${membership.duration}`}>
                        <img className="block rounded-tl-lg rounded-tr-lg" src={`/membershipNFTs/${membership.duration}months.png`} alt="" />
                            <div className="border-b border-b-gray-100 flex justify-between p-4">
                                    <p>{membership.duration} MONTHS</p>
                                    <div>{membership.price} Dai</div>
                            </div>
                            <div className="mt-2 px-4">Get {membership.extras}</div>
                            <button className="m-3 px-2 py-1 bg-white text-orange-500 hover:text-orange-700 rounded mx-auto block">BUY NOW</button>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MembershipTypes