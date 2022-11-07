import Cover from '../components/cover'
import Layout from '../components/layout'
import MembershipTypes from '../components/membershipTypes'
import { GetSubscriptionContract } from '../utils/NFTSubscriptionUtils';

export default function Home() {

  return (
    <Layout>
      <Cover />
      <MembershipTypes />
    </Layout>
  )
}
