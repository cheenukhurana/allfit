import Layout from '../components/layout'
import MembershipTypes from '../components/membershipTypes'
import { GetSubscriptionContract } from '../utils/NFTSubscriptionUtils';

export default function Home() {

  return (
    <Layout>
      Choose Your All Pass
      <MembershipTypes />
    </Layout>
  )
}
