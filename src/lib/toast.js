import { toast } from '@/components/ui/sonner'

export function useToast() {
  /**
   * Tampilkan toast success
   */
  const success = (message) => {
    toast(message, {
      description: 'Berhasil',
      duration: 3000,
    })
  }
  /**
   * Tampilkan toast error
   */
  const error = (message) => {
    toast(message, {
      description: 'Terjadi kesalahan',
      duration: 4000,
      class: 'bg-red-600 text-white'
    })
  }

  /**
   * Tampilkan toast custom
   */
  const custom = (message, options = {}) => {
    toast(message, options)
  }

  return { success, error, custom }
}
