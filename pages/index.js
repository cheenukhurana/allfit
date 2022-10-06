import Head from 'next/head'
import Image from 'next/image'
import Layout from '../components/layout'
import styles from '../styles/Home.module.css'
import MembershipTypes from '../components/membershipTypes'

export default function Home() {
  return (
    <Layout>
      Choose Your All Pass
      <MembershipTypes />
    </Layout>
  )
}
