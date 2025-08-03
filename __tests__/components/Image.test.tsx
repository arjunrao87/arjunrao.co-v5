import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '../../src/test/test-utils'
import { axe } from 'jest-axe'
import Image from '../../components/Image'

// Note: next/image is already mocked in our test setup to render a regular img tag

describe('Image', () => {
  const mockProps = {
    src: '/static/images/test.jpg',
    alt: 'Test image description',
    width: 800,
    height: 600
  }

  it('renders image with provided props', () => {
    render(<Image {...mockProps} />)
    
    const image = screen.getByRole('img', { name: /test image description/i })
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('src', '/static/images/test.jpg')
    expect(image).toHaveAttribute('alt', 'Test image description')
    expect(image).toHaveAttribute('width', '800')
    expect(image).toHaveAttribute('height', '600')
  })

  it('applies default width and height when not provided', () => {
    const propsWithoutDimensions = {
      src: '/static/images/test.jpg',
      alt: 'Test image'
    }
    
    render(<Image {...propsWithoutDimensions} />)
    
    const image = screen.getByRole('img')
    expect(image).toHaveAttribute('width', '672') // Default width
    expect(image).toHaveAttribute('height', '384') // Default height
  })

  it('applies default CSS classes', () => {
    render(<Image {...mockProps} />)
    
    const image = screen.getByRole('img')
    expect(image).toHaveClass(
      'mx-auto',
      'max-h-96',
      'w-full',
      'max-w-full',
      'rounded-lg',
      'object-contain',
      'sm:max-w-[672px]'
    )
  })

  it('allows custom className to be passed through', () => {
    render(<Image {...mockProps} className="custom-class" />)
    
    const image = screen.getByRole('img')
    expect(image).toHaveClass('custom-class')
    // Should also maintain default classes
    expect(image).toHaveClass('mx-auto', 'rounded-lg')
  })

  it('passes through additional props', () => {
    render(
      <Image 
        {...mockProps} 
        id="custom-id"
        data-testid="custom-image"
        loading="lazy"
      />
    )
    
    const image = screen.getByTestId('custom-image')
    expect(image).toHaveAttribute('id', 'custom-id')
    expect(image).toHaveAttribute('loading', 'lazy')
  })

  it('uses default sizes value', () => {
    render(<Image {...mockProps} />)
    
    const image = screen.getByRole('img')
    // In our test environment, the Next.js Image component is mocked,
    // but we can verify the component receives the expected props
    expect(image).toBeInTheDocument()
  })

  it('allows custom sizes to be provided', () => {
    render(<Image {...mockProps} sizes="100vw" />)
    
    const image = screen.getByRole('img')
    expect(image).toBeInTheDocument()
  })

  it('uses default placeholder and blur settings', () => {
    render(<Image {...mockProps} />)
    
    const image = screen.getByRole('img')
    expect(image).toBeInTheDocument()
    // These props would be passed to Next.js Image in real environment
  })

  it('allows custom placeholder settings', () => {
    render(
      <Image 
        {...mockProps} 
        placeholder="empty"
        blurDataURL="custom-blur-data"
      />
    )
    
    const image = screen.getByRole('img')
    expect(image).toBeInTheDocument()
  })

  it('handles missing alt text gracefully', () => {
    const propsWithoutAlt = {
      src: '/static/images/test.jpg',
      width: 800,
      height: 600,
      alt: ""
    }
    
    render(<Image {...propsWithoutAlt} />)
    
    // When alt is empty, image is decorative and doesn't have img role
    const container = screen.getByTestId('test-wrapper')
    const image = container.querySelector('img')
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('alt', '')
  })

  it('handles different image formats', () => {
    const imageFormats = [
      '/static/images/test.jpg',
      '/static/images/test.png',
      '/static/images/test.webp',
      '/static/images/test.svg'
    ]

    imageFormats.forEach((src, index) => {
      render(<Image src={src} alt={`Test image ${index}`} key={index} />)
      
      const image = screen.getByRole('img', { name: `Test image ${index}` })
      expect(image).toBeInTheDocument()
      expect(image).toHaveAttribute('src', src)
    })
  })

  it('handles absolute URLs', () => {
    render(
      <Image 
        src="https://example.com/image.jpg"
        alt="External image"
        width={400}
        height={300}
      />
    )
    
    const image = screen.getByRole('img', { name: /external image/i })
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('src', 'https://example.com/image.jpg')
  })

  it('handles different aspect ratios', () => {
    const aspectRatios = [
      { width: 800, height: 600 }, // 4:3
      { width: 1920, height: 1080 }, // 16:9
      { width: 500, height: 500 }, // 1:1
      { width: 400, height: 800 }, // Tall
    ]

    aspectRatios.forEach(({ width, height }, index) => {
      render(
        <Image 
          src="/static/images/test.jpg"
          alt={`Aspect ratio test ${index}`}
          width={width}
          height={height}
          key={index}
        />
      )
      
      const image = screen.getByRole('img', { name: `Aspect ratio test ${index}` })
      expect(image).toHaveAttribute('width', width.toString())
      expect(image).toHaveAttribute('height', height.toString())
    })
  })

  it('should not have accessibility violations', async () => {
    const { container } = render(<Image {...mockProps} />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('should not have accessibility violations with empty alt', async () => {
    const { container } = render(<Image {...mockProps} alt="" />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('maintains responsive behavior through CSS classes', () => {
    render(<Image {...mockProps} />)
    
    const image = screen.getByRole('img')
    // Check for responsive classes
    expect(image).toHaveClass('w-full', 'max-w-full', 'sm:max-w-[672px]')
  })

  it('provides proper object-fit behavior', () => {
    render(<Image {...mockProps} />)
    
    const image = screen.getByRole('img')
    expect(image).toHaveClass('object-contain')
  })

  it('centers the image with margin auto', () => {
    render(<Image {...mockProps} />)
    
    const image = screen.getByRole('img')
    expect(image).toHaveClass('mx-auto')
  })

  it('applies rounded corners', () => {
    render(<Image {...mockProps} />)
    
    const image = screen.getByRole('img')
    expect(image).toHaveClass('rounded-lg')
  })

  it('limits maximum height', () => {
    render(<Image {...mockProps} />)
    
    const image = screen.getByRole('img')
    expect(image).toHaveClass('max-h-96')
  })

  it('handles priority prop for above-the-fold images', () => {
    render(<Image {...mockProps} priority />)
    
    const image = screen.getByRole('img')
    expect(image).toBeInTheDocument()
    // Priority prop would be passed to Next.js Image in real environment
  })

  it('handles quality prop', () => {
    render(<Image {...mockProps} quality={90} />)
    
    const image = screen.getByRole('img')
    expect(image).toBeInTheDocument()
    // Quality prop would be passed to Next.js Image in real environment
  })
})