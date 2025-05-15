package com.example.demo.controller;

import com.example.demo.model.Filme;
import com.example.demo.repository.FilmeRepository;
import com.example.demo.dto.FilmeDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/filmes")
@CrossOrigin(origins = "*")
public class FilmeController {

    @Autowired
    private FilmeRepository filmeRepository;

    // ✅ GET: Listar filmes agrupados por gênero
    @GetMapping
    public Map<String, List<FilmeDTO>> listarFilmesPorGenero() {
        List<FilmeDTO> filmesDTO = filmeRepository.findAll()
                .stream()
                .map(FilmeDTO::new)
                .collect(Collectors.toList());

        return filmesDTO.stream()
                .collect(Collectors.groupingBy(FilmeDTO::getGenero));
    }

    // ✅ GET: Retornar somente a imagem (PNG) por ID
    @GetMapping("/{id}/imagem")
    public ResponseEntity<byte[]> buscarImagemPorId(@PathVariable Long id) {
        Filme filme = filmeRepository.findById(id).orElse(null);

        if (filme != null && filme.getImagem() != null) {
            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_TYPE, MediaType.IMAGE_PNG_VALUE)
                    .body(filme.getImagem());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // ✅ POST: Adicionar novo filme
    @PostMapping
    public Filme adicionarFilme(@RequestBody Filme filme) {
        return filmeRepository.save(filme);
    }

    // ✅ GET: Buscar filme por ID
    @GetMapping("/{id}")
    public Filme buscarPorId(@PathVariable Long id) {
        return filmeRepository.findById(id).orElse(null);
    }

    // ✅ DELETE: Remover filme por ID
    @DeleteMapping("/{id}")
    public void deletarFilme(@PathVariable Long id) {
        filmeRepository.deleteById(id);
    }

    // ✅ PUT: Atualizar filme por ID
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
}
