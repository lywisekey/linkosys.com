import softwareDevelopment from '@/assets/images/illus/software-development.svg'
import aiAndData from '@/assets/images/illus/ai-and-data.svg'
import cloudInfrastructure from '@/assets/images/illus/cloud-infrastructure.svg'
import cybersecurity from '@/assets/images/illus/cybersecurity.svg'
import itStaffing from '@/assets/images/illus/it-staffing.svg'
import programManagement from '@/assets/images/illus/program-management.svg'

/**
 * Isometric line art per service, drawn in scripts/generate-illustrations.py.
 * Keyed by service slug so a new service fails loudly (undefined) rather than
 * silently showing the wrong scene.
 */
export const serviceIllustrations: Record<string, string> = {
  'software-development': softwareDevelopment,
  'ai-and-data': aiAndData,
  'cloud-infrastructure': cloudInfrastructure,
  cybersecurity,
  'it-staffing': itStaffing,
  'program-management': programManagement
}
