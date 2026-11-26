import { connectDatabase } from './config/db.js'
import { Project } from './models/index.js'

const projects = [
  {
    title: 'Mughal Store',
    kicker: 'Full-stack e-commerce',
    mock: 'store',
    order: 1,
    description:
      'A full-stack e-commerce platform with a customer-facing storefront and a custom administrative dashboard, connected through its own backend API.',
    features: [
      'Modern e-commerce storefront',
      'Custom admin dashboard',
      'Product management',
      'Order management',
      'Customer authentication',
      'Shopping experience',
      'Backend API integration',
    ],
    tech: ['Next.js', 'React.js', 'Node.js', 'Express.js', 'MongoDB'],
    links: [
      { label: 'Live store', href: 'https://mughalstore.vercel.app', primary: true },
      { label: 'Admin panel', href: 'https://mughalstoreadminpanel.vercel.app', primary: false },
    ],
  },
  {
    title: 'SMIT Final Hackathon Project',
    kicker: 'MERN application',
    mock: 'app',
    order: 2,
    description:
      'A full-stack MERN application designed and delivered under strict time constraints during the SMIT final hackathon.',
    tech: ['MongoDB', 'Express.js', 'React.js', 'Node.js'],
    links: [{ label: 'Live demo', href: 'https://smit-final-hackathon-ruby.vercel.app', primary: true }],
  },
]

await connectDatabase()

if (await Project.countDocuments()) {
  console.log('Projects already exist. Nothing seeded.')
} else {
  await Project.create(projects)
  console.log(`Seeded ${projects.length} projects.`)
}

process.exit(0)
