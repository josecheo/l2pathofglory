import {
  FUNDING,
  PayPalButtons,
  PayPalScriptProvider,
} from "@paypal/react-paypal-js";
import { data, useLocation, useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

type CheckoutData = {
  amount: number;
  currency: "USD" | "PEN";
  characterName: string;
  server?: string;
  itemLabel?: string; // ej: "Donation Pack"
  note?: string;
  draftId?: string;

  // Si tú ya estás pasando state.usd, lo soportamos también:
  usd?: string | number;
};

const STORAGE_KEY = "paypal:checkout";

function formatMoney(currency: string, amount: number) {
  const value = Number.isFinite(amount) ? amount : 0;
  return `${currency} ${value.toFixed(2)}`;
}


export function PaypalCheckout() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const PAYPAL_API = import.meta.env.VITE_PAYPAL_CLIENT_ID || "";
  // Soporta tu state actual (state.usd) y el "shape" CheckoutData normal (amount/currency)
  const checkout = (state ?? {}) as Partial<CheckoutData>;

  const currency: "USD" | "PEN" = checkout.currency ?? "USD";

  const characterName = String(checkout.characterName ?? "").trim();

  // Si no hay data mínima, vuelve
  if (!characterName || Number(state.usd) <= 0) {
    navigate("/account", { replace: true });
    return null;
  }
  console.log("Checkout data:", { state });
  const itemLabel = checkout.itemLabel ?? "Donación al servidor";
  const note = (checkout.note ?? "").trim() || "Sin nota";

  const validatePaymentOnBackend = async (orderId: string) => {
  await fetch(`${API_URL}/paypal/confirm`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ orderId: orderId }),
});
}
  return (
    <PayPalScriptProvider
      options={{
        clientId: PAYPAL_API,
        currency: "USD",
        intent: "capture",
        components: "buttons",
        // 👇 clave: deshabilita card para que no te mande al guest checkout
        "disable-funding": "card,paylater,venmo",
        // opcional:
        locale: "es_PE",
      }}
    >
      <div className="min-h-screen bg-white text-zinc-900">
        {/* Header */}
        <div className="border-b border-zinc-200 bg-white">
          <div className="max-w-5xl mx-auto px-6 py-5 flex items-center justify-between">
            <div>
              <h1 className="text-xl md:text-2xl font-extrabold tracking-tight text-zinc-900">
                Confirmar donación
              </h1>
              <p className="text-sm text-zinc-500">
                Revisa tu resumen y completa el pago con PayPal.
              </p>
            </div>

            <button
              onClick={() => navigate("/account")}
              className=" px-6 py-2 bg-gradient-to-r from-gray-800/80 to-gray-900/80 hover:from-gray-700/80 hover:to-gray-800/80 text-white font-bold  rounded-lg transition-all duration-300 transform hover:scale-105 border border-gray-700"
            >
              Volver
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-5xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Summary card */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-zinc-200 bg-white shadow-lg overflow-hidden">
              {/* top gradient bar */}
              <div className="h-1 bg-gradient-to-r from-yellow-600 to-amber-700" />

              <div className="p-5 md:p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center rounded-full border border-zinc-300 bg-white px-2.5 py-1 text-xs font-bold text-zinc-700">
                        Donación
                      </span>
                      <span className="inline-flex items-center rounded-full border border-amber-300 bg-amber-50 px-2.5 py-1 text-xs font-bold text-amber-700">
                        PayPal
                      </span>
                      {checkout.server && (
                        <span className="inline-flex items-center rounded-full border border-zinc-300 bg-white px-2.5 py-1 text-xs font-bold text-zinc-700">
                          {checkout.server}
                        </span>
                      )}
                    </div>

                    <h2 className="mt-3 text-lg md:text-xl font-extrabold text-zinc-900">
                      {itemLabel}
                    </h2>

                    <p className="mt-1 text-sm text-zinc-600">
                      El pago se aplicará al personaje indicado una vez sea
                      aprobado.
                    </p>
                  </div>

                  <div className="text-right">
                    <div className="text-xs text-zinc-500">Total</div>
                    <div className="text-2xl font-extrabold text-zinc-900">
                      {formatMoney(currency, Number(state.usd))}
                    </div>
                  </div>
                </div>

                {/* Details */}
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4">
                    <div className="text-xs text-zinc-500">Personaje</div>
                    <div className="mt-1 text-base font-bold break-words text-zinc-900">
                      {characterName}
                    </div>
                  </div>

                  <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4">
                    <div className="text-xs text-zinc-500">Método</div>
                    <div className="mt-1 text-base font-bold text-zinc-900">
                      PayPal Checkout
                    </div>
                  </div>

                  <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 md:col-span-2">
                    <div className="text-xs text-zinc-500">Nota</div>
                    <div className="mt-1 text-sm text-zinc-700">{note}</div>
                  </div>
                </div>

                {/* Divider */}
                <div className="mt-6 border-t border-zinc-200 pt-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-zinc-600">Subtotal</span>
                    <span className="font-bold text-zinc-900">
                      {formatMoney(currency, Number(state.usd))}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm mt-2">
                    <span className="text-zinc-600">Comisiones</span>
                    <span className="font-bold text-zinc-700">
                      Incluidas por PayPal
                    </span>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-zinc-600">Total a pagar</span>
                    <span className="text-xl font-extrabold text-zinc-900">
                      {formatMoney(currency, Number(state.usd))}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Security note */}
            <div className="mt-4 rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
              <p className="text-sm text-zinc-700">
                <span className="font-bold text-zinc-900">Tip:</span> Si
                recargas la página, tu resumen se conserva (guardado
                temporalmente). Cuando el pago se apruebe, se limpiará
                automáticamente.
              </p>
            </div>
          </div>

          {/* PayPal box */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-zinc-200 bg-white shadow-lg overflow-hidden">
              <div className="h-1 bg-gradient-to-r from-emerald-600 to-emerald-500" />

              <div className="p-5 md:p-6">
                <h3 className="text-base font-extrabold text-zinc-900">
                  Pagar con PayPal
                </h3>
                <p className="mt-1 text-sm text-zinc-500">
                  Se abrirá el flujo de PayPal para confirmar tu pago.
                </p>

                {/* IMPORTANT: keep PayPal on white */}
                <div className="mt-4 rounded-xl bg-white p-4 border border-zinc-200">
                  <PayPalButtons
                    fundingSource={FUNDING.PAYPAL}
                    style={{
                      layout: "vertical",
                      color: "blue",
                      shape: "rect",
                      label: "paypal",
                    }}
                    createOrder={(data, actions) => {
                      return actions.order.create({
                        intent: "CAPTURE",
                        purchase_units: [
                          {
                            description: `Donation for ${characterName}`,
                            custom_id: state.draft.draftId ?? "donation",
                            amount: {
                              currency_code: "USD",
                              value: Number(state.usd).toFixed(2),
                            },
                          },
                        ],
                      });
                    }}
                    onApprove={(data, actions) => {
                      return actions.order!.capture().then((details) => {
                        console.log("Approved ✅", { data, details });
                        validatePaymentOnBackend(data.orderID)

                        localStorage.removeItem(STORAGE_KEY);

                        navigate("/account", { replace: true });
                      });
                    }}
                    onCancel={() => alert("Pago cancelado.")}
                    onError={(err) => {
                      console.error("PayPal error:", err);
                      alert("Ocurrió un error con PayPal. Intenta nuevamente.");
                    }}
                  />
                </div>

                <div className="mt-4 text-xs text-zinc-500 leading-relaxed">
                  Al continuar, aceptas que el pago sea procesado por PayPal.
                  Para evitar fraudes, en producción valida la orden en tu
                  backend antes de aplicar la donación.
                </div>
              </div>
            </div>

            {/* Small actions */}
            <div className="mt-4 grid grid-cols-1 gap-3">
              <button
                onClick={() => {
                  localStorage.removeItem(STORAGE_KEY);
                  navigate("/account", { replace: true });
                }}
                className=" px-6 py-2 bg-gradient-to-r from-gray-800/80 to-gray-900/80 hover:from-gray-700/80 hover:to-gray-800/80 text-white font-bold  rounded-lg transition-all duration-300 transform hover:scale-105 border border-gray-700"
              >
                Cancelar y limpiar
              </button>
            </div>
          </div>
        </div>
      </div>
    </PayPalScriptProvider>
  );
}
