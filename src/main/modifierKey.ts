import { execFile } from "node:child_process";

/**
 * Check the current state of the Option (Alt) modifier key on macOS.
 * Uses a Python one-liner that calls the Objective-C runtime to read
 * NSEvent.modifierFlags — the same API Electron uses internally.
 */
export function getOptionKeyStateMacos(): Promise<boolean> {
  return new Promise((resolve) => {
    // kCGEventFlagMaskAlternate = 0x80000 (1 << 19)
    const script = `
import ctypes, ctypes.util, sys
try:
  objc = ctypes.cdll.LoadLibrary(ctypes.util.find_library('objc'))
  gcf = objc.objc_getClass
  gcf.restype = ctypes.c_void_p
  srn = objc.sel_registerName
  srn.restype = ctypes.c_void_p
  ms = objc.objc_msgSend
  ms.argtypes = [ctypes.c_void_p, ctypes.c_void_p]
  ms.restype = ctypes.c_uint64
  NSEvent = gcf(b'NSEvent')
  mf = srn(b'modifierFlags')
  flags = ms(NSEvent, mf)
  sys.stdout.write('1' if flags & 0x80000 else '0')
except Exception:
  sys.stdout.write('0')
`;
    execFile("/usr/bin/python3", ["-c", script], { timeout: 500 }, (error, stdout) => {
      resolve(error ? false : stdout.trim() === "1");
    });
  });
}

/**
 * Check the current state of the Alt modifier key on Windows.
 * Falls back to false (not supported on Windows yet).
 */
export function getOptionKeyStateWindows(): Promise<boolean> {
  return Promise.resolve(false);
}