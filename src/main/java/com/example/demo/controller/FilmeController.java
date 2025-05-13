package com.example.demo.controller;

import com.example.demo.model.Filme;
import com.example.demo.repository.FilmeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/filmes")
@CrossOrigin(origins = "*")
public class FilmeController {

    @Autowired
    private FilmeRepository filmeRepository;

    // GET: Listar todos os filmes
    @GetMapping
    public List<Filme> listarFilmes() {
        return filmeRepository.findAll();
    }

    // POST: Adicionar um novo filme
    @PostMapping
    public Filme adicionarFilme(@RequestBody Filme filme) {
        return filmeRepository.save(filme);
    }

    // GET: Buscar por ID
    @GetMapping("/{id}")
    public Filme buscarPorId(@PathVariable Long id) {
        return filmeRepository.findById(id).orElse(null);
    }

    // DELETE: Remover filme
    @DeleteMapping("/{id}")
    public void deletarFilme(@PathVariable Long id) {
        filmeRepository.deleteById(id);
    }

    // PUT: Atualizar filme
    @PutMapping("/{id}")
    public Filme atualizarFilme(@PathVariable Long id, @RequestBody Filme filmeAtualizado) {
        return filmeRepository.findById(id).map(filme -> {
            filme.setNome(filmeAtualizado.getNome());
            filme.setGenero(filmeAtualizado.getGenero());
            filme.setLancamento(filmeAtualizado.getLancamento());
            filme.setTrailer(filmeAtualizado.getTrailer());
            filme.setElenco_principal(filmeAtualizado.getElenco_principal());
            filme.setDescricao(filmeAtualizado.getDescricao());
            filme.setDiretor(filmeAtualizado.getDiretor());
            filme.setImagem(filmeAtualizado.getImagem());
            return filmeRepository.save(filme);
        }).orElse(null);
    }
@GetMapping("/{id}/imagem")
@ResponseBody
public ResponseEntity<byte[]> buscarImagemPorId(@PathVariable Long id) {
    return filmeRepository.findById(id)
        .map(filme -> {
            byte[] imagem = filme.getImagem();
            if (imagem != null) {
                return ResponseEntity
                        .ok()
                        .header("Content-Type", "image/jpeg") // ou "image/png" se for PNG
                        .body(imagem);
            } else {
                return ResponseEntity.notFound().build();
            }
        })
        .orElseGet(() -> ResponseEntity.notFound().build());
}

}