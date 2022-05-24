import './MenuButton.css'

export const MenuButton = ({ isOpen }) => {
  return (
    <>
      <div className='menu-button'>
        <div className='line topLine'></div>
        <div className='line middleLine'></div>
        <div className='line bottomLine'></div>
      </div>
      {/*TODO -FIXME:[ ] => The `jsx`  was removed due to an compile error: TypeScript error in client/src/components/Navbar/MenuButton.tsx(14,14): 
      Type '{ children: string; jsx: true; }' is not assignable to type DetailedHTMLProps<StyleHTMLAttributes<HTMLStyleElement>, HTMLStyleElement>'.
  
      Property 'jsx' does not exist on type 'DetailedHTMLProps<StyleHTMLAttributes<HTMLStyleElement>, HTMLStyleElement>'.  TS2322
      ` */}
      {/* <style jsx>{` */}
      <style>{`
        .topLine {
          transform: ${isOpen ? 'rotate(45deg)' : 'rotate(0)'};
        }
        .middleLine {
          transform: ${isOpen ? 'translateX(100)' : 'translateX(0)'};
          opacity: ${isOpen ? 0 : 1};
        }
        .bottomLine {
          transform: ${isOpen ? 'rotate(-45deg)' : 'rotate(0)'};
        }
      `}</style>
    </>
  )
}
