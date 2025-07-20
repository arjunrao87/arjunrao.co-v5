import NextImage, { ImageProps } from 'next/image'

const Image = ({ width, height, ...rest }: ImageProps) => (
  <NextImage
    className="mx-auto max-h-96 max-w-[672px] rounded-lg object-contain"
    width={width || 672}
    height={height || 384}
    {...rest}
  />
)

export default Image
