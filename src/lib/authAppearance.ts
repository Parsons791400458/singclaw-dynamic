export const authAppearance = {
  variables: {
    colorPrimary: '#10b981',
    colorBackground: '#ffffff',
    colorInputBackground: '#f8fafc',
    colorInputText: '#0f172a',
    colorText: '#0f172a',
    colorTextSecondary: '#475569',
    colorNeutral: '#64748b',
    colorDanger: '#e11d48',
    borderRadius: '8px',
    fontFamily: 'inherit',
  },
  elements: {
    rootBox: '!w-full !min-w-0 !max-w-full',
    cardBox: '!w-full !min-w-0 !max-w-full overflow-hidden',
    card: '!w-full !min-w-0 !max-w-full bg-white border-0 shadow-none p-0 text-slate-950',
    header: 'hidden',
    main: '!w-full !min-w-0 !max-w-full gap-5',
    form: '!w-full !min-w-0 !max-w-full gap-4',
    formFieldRow: 'grid grid-cols-1 gap-4',
    formFieldRow__name: 'grid grid-cols-1 gap-4 sm:grid-cols-2',
    formField: 'min-w-0 gap-2',
    formFieldLabel: 'text-sm font-semibold text-slate-800',
    formFieldInput:
      'h-11 w-full min-w-0 rounded-lg border border-slate-300 bg-slate-50 px-3 text-slate-950 placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20',
    formFieldInputShowPasswordButton: 'text-slate-600 hover:text-slate-950',
    phoneInputBox:
      'h-11 w-full min-w-0 rounded-lg border border-slate-300 bg-slate-50 text-slate-950 focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/20',
    selectButton: 'text-slate-800 hover:text-slate-950',
    selectButton__countryCode: 'h-10 rounded-md bg-slate-100 text-slate-900 hover:bg-slate-200',
    selectButtonIcon: 'text-slate-500',
    formFieldErrorText: 'text-rose-600',
    formButtonPrimary:
      'h-11 rounded-lg bg-emerald-500 text-sm font-black text-white shadow-none transition hover:bg-emerald-600 focus:ring-2 focus:ring-emerald-500/40',
    footerAction: 'text-slate-500',
    footerActionText: 'text-slate-500',
    footerActionLink: 'font-semibold text-emerald-700 hover:text-emerald-800',
    footer: '!w-full !min-w-0 !max-w-full',
    dividerLine: 'bg-slate-200',
    dividerText: 'text-slate-400',
    socialButtons: 'grid grid-cols-3 gap-2',
    socialButtonsIconButton: '!min-w-0 border border-slate-300 bg-white text-slate-900 hover:bg-slate-50',
    socialButtonsBlockButton:
      'border border-slate-300 bg-white text-slate-900 hover:bg-slate-50',
    socialButtonsBlockButtonText: 'text-slate-900',
    alert: 'border border-amber-300 bg-amber-50 text-amber-900',
    alertText: 'text-amber-900',
    identityPreview: 'border border-slate-200 bg-slate-50 text-slate-900',
    identityPreviewText: 'text-slate-900',
    alternativeMethodsBlockButton:
      'border border-slate-300 bg-white text-slate-900 hover:bg-slate-50',
    formResendCodeLink: 'text-emerald-700 hover:text-emerald-800',
    otpCodeFieldInput:
      'border-slate-300 bg-slate-50 text-slate-950 focus:border-emerald-500',
  },
}

export const registerAppearance = {
  ...authAppearance,
}
