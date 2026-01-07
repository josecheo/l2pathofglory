export default function Footer() {
  return (
       <footer className="pt-12 pb-8 border-t border-gray-800/50 mt-8 p-24">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-gray-400 text-sm">
                © 2024 Path Of Glory, Inc. Todos los derechos reservados.
              </p>
              {/* <p className="text-gray-500 text-xs mt-1">
                World of Warcraft, Midnight y sus respectivos logos son marcas registradas de Blizzard Entertainment, Inc.
              </p> */}
            </div>
            <div className="flex space-x-6">
              {['Política de privacidad', 'Términos de uso', 'Cookie Policy', 'Contacto'].map((item) => (
                <a key={item} href="#" className="text-gray-400 hover:text-yellow-400 text-sm transition-colors duration-300">
                  {item}
                </a>
              ))}
            </div>
          </div>
        </footer>
  );
}
