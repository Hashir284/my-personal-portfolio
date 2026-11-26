import { SiReact, SiJavascript, SiHtml5, SiTailwindcss, SiNextdotjs, SiTypescript, SiNodedotjs, SiExpress, SiMongodb, SiPostgresql, SiGit, SiGithub, SiNpm, SiGooglechrome, SiGooglegemini, SiClaude, SiGithubcopilot, SiX } from 'react-icons/si'
import { FaCss3Alt } from 'react-icons/fa6'
import { RiOpenaiFill } from 'react-icons/ri'
import { VscVscode } from 'react-icons/vsc'
import { FiLayout, FiSmartphone, FiBox, FiLayers, FiLink, FiCpu, FiCode, FiGlobe, FiGitBranch, FiDatabase, FiShield, FiServer } from 'react-icons/fi'

export const icons = {
  react: SiReact, javascript: SiJavascript, html: SiHtml5, css: FaCss3Alt, tailwind: SiTailwindcss, nextjs: SiNextdotjs, typescript: SiTypescript,
  node: SiNodedotjs, express: SiExpress, mongodb: SiMongodb, postgresql: SiPostgresql, git: SiGit, github: SiGithub, npm: SiNpm, chrome: SiGooglechrome,
  gemini: SiGooglegemini, claude: SiClaude, copilot: SiGithubcopilot, x: SiX, openai: RiOpenaiFill, vscode: VscVscode,
  layout: FiLayout, mobile: FiSmartphone, box: FiBox, layers: FiLayers, link: FiLink, cpu: FiCpu, code: FiCode, globe: FiGlobe, branch: FiGitBranch,
  database: FiDatabase, shield: FiShield, server: FiServer,
}
export const iconKeys = Object.keys(icons)
export const getIcon = (k) => icons[k] || FiCode
